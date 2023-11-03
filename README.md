# Transparency dashboard v1 for tracking donations through Flockby <> Biocents

This project is a WIP repo containing all the canisters contracts and frontend code for the transparency dashboard.

The Biocents transparency dashboard aims to show the status of all donations and settlements to wildlife restoration and conservation programs across the world.

**Tech Stack**

- NextJS for frontend
- DFX for ICP development
- Rust for canister code

**Canisters**

- Written in Rust, use crates such as serde, ic-cdk, ic-cdk-timers
- Effectively, the ICP canister functions as an immutable indexer in public record. 
- Frontend assets canister built using nextJS

**Backend**

- Flocky is developing a backend separately that functions as our source of transaction data

**Frontend**

- A simple two page frontend that displays list of active programs, and another page for donation details
- A dynamic url system where Flockby will let their users see their donations privately

## Project Structure

- backend/src (backend)
- pages/ (frontend routes)
- ui/ (frontend components and services)
- dfx.json (canister configurations)

## Author

Gautam Padiyar, gautam@wildfire.co.in
Twitter: @padiyar_

## Contributing

Please feel free to raise an issue or submit a pull request.

## License

MIT
