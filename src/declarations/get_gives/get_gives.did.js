export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'get_gives' : IDL.Func([], [IDL.Text], []) });
};
export const init = ({ IDL }) => { return []; };
