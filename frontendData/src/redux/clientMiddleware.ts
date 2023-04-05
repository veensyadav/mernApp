export default function clientMiddleware(client: any) {
    return ({ dispatch, getState }: any) => ((next: any) => (action: any) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
  
      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }
  
      const [REQUEST, SUCCESS, FAILURE] = types;
      next({ ...rest, type: REQUEST });
  
      return new Promise((resolve, reject) => {
        promise(client)
          .then((result: any) => {
            next({ ...rest, result, type: SUCCESS });
            resolve(result);
          })
          .catch((error: any) => {
            next({ ...rest, error, type: FAILURE });
            reject(error);
          });
      });
    });
  }
  