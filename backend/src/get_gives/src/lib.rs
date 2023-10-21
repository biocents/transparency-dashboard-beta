use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod, HttpResponse, TransformArgs,
    TransformContext,
};

use candid::{CandidType, Decode, Encode};

use serde::{Deserialize, Serialize};
use serde_json::{Result, Value};

use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{
    storable::Bound, DefaultMemoryImpl, StableBTreeMap, Storable,
};
use std::{borrow::Cow, cell::RefCell};

type Memory = VirtualMemory<DefaultMemoryImpl>;

const MAX_VALUE_SIZE: u32 = 10000;


#[derive(Debug, Serialize, Deserialize)]
struct ApiResponse {
    message: String,
    data: Vec<Record>,
}

#[derive(Debug, Serialize, Deserialize, CandidType, Clone)]
struct Record {
    parentNonprofits: Vec<String>,
    userId: String,
    giverEmailId: String,
    giveId: String,
    createdOn: String,
    feathersAmount: u32,
    giverId: String,
    projectId: String,
}

impl Storable for Record {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE,
        is_fixed_size: false,
    };
}

thread_local! {
    // The memory manager is used for simulating multiple memories. Given a `MemoryId` it can
    // return a memory that can be used by stable structures.
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    static MAP: RefCell<StableBTreeMap<u64, Record, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))),
        )
    );
}

/// Retrieves the value associated with the given key if it exists.
#[ic_cdk::query]
fn get(key: u64) -> Option<Record> {
    MAP.with(|p| p.borrow().get(&key))
}

#[ic_cdk::update]
fn insert(key: u64, value: Record) -> Option<Record> {
    MAP.with(|p| p.borrow_mut().insert(key, value))
}

//Update method using the HTTPS outcalls feature
#[ic_cdk::update]
async fn get_gives() -> String {
    //2. SETUP ARGUMENTS FOR HTTP GET request

    /*
    // 2.1 Setup the URL and its query parameters
    type Timestamp = u64;
    let start_timestamp: Timestamp = 1680287401; //April 1, 2023 22:01:00 GMT
    let end_date: Timestamp = 1693247401; //Sep 29, 2023 22:01:00 GMT
    let host = "http://34.173.214.137:90";
    let url = format!(
        "{}/gives/?start_date={}&end_date={}",
        host,
        start_timestamp.to_string(),
        end_date.to_string(),
    );
*/
    let host = "flockby.j8t.io";
    let url1 = "https://flockby.j8t.io/feathers/gives/blockchain/temp";

    // /gives/?start_date={}&end_date={}

    // 2.2 prepare headers for the system http_request call
    //Note that `HttpHeader` is declared in line 4
    let request_headers = vec![
        HttpHeader {
            name: "Host".to_string(),
            value: format!("{host}:443"),
        },
        HttpHeader {
            name: "User-Agent".to_string(),
            value: "exchange_rate_canister".to_string(),
        },
    ];

    let request = CanisterHttpRequestArgument {
        url: url1.to_string(),
        max_response_bytes: None, //optional for request
        method: HttpMethod::GET,
        headers: request_headers,
        body: None,      //optional for request
        transform: None, //optional for request
    };

    match http_request(request).await {
        
        Ok((response,)) => {
 
            let str_body = String::from_utf8(response.body)
                .expect("Transformed response is not UTF-8 encoded.");

            let api_response: ApiResponse = serde_json::from_str(&str_body).unwrap();

            for (index, record) in api_response.data.iter().enumerate() {
                let key = index as u64; // Convert the usize from enumerate() to u64
                insert(key, record.clone());
            }

            if let Some(first_record) = get(0) {
                first_record.userId.clone()
                //get(0).userId
            } else {
                String::from("No records found.")
            }
            
        }
        Err((r, m)) => {
            let message =
                format!("The http_request resulted into error. RejectionCode: {r:?}, Error: {m}");

            //Return the error as a string and end the method
            message
        }
    }
}

/*
TODO

STRUCT DEFINITION FOR get gives response
use serde to model the data and parse into struct
use stable memory to write to a "log" datatype entry

*/