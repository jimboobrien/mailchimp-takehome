import { Api } from './index';

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

describe('Api', () => {
  beforeEach(() => {
    fetch.mockClear(); // Clear any previous mock calls
  });



  describe('call method', () => {
    it('should call fetch with correct URL and method', async () => {
      const url = '/test-url';
      const method = 'get';

      await Api.call(url, method);

      expect(fetch).toHaveBeenCalledWith(url, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    });

//     it('should include body in fetch if provided', async () => {
//       const url = '/test-url';
//       const method = 'post';
//       const body = { name: 'John Doe' };

//       await Api.call(url, method, body);

//       expect(fetch).toHaveBeenCalledWith(url, {
//         method: 'post',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//       });
//     });

//     it('should return JSON response', async () => {
//       const url = '/test-url';
//       const method = 'get';

//       const response = await Api.call(url, method);

//       expect(response).toEqual({ success: true });
//     });
   });

//   describe('get method', () => {
//     it('should call the call method with "get" method', async () => {
//       const spy = jest.spyOn(Api, 'call');
//       const url = '/test-get-url';

//       await Api.get(url);

//       expect(spy).toHaveBeenCalledWith(url, 'get');
//     });
//   });

//   describe('post method', () => {
//     it('should call the call method with "post" method and body', async () => {
//       const spy = jest.spyOn(Api, 'call');
//       const url = '/test-post-url';
//       const body = { message: 'Hello World' };

//       await Api.post(url, body);

//       expect(spy).toHaveBeenCalledWith(url, 'post', body);
//     });
//   });

//   describe('delete method', () => {
//     it('should call the call method with "delete" method', async () => {
//       const spy = jest.spyOn(Api, 'call');
//       const url = '/test-delete-url';

//       await Api.delete(url);

//       expect(spy).toHaveBeenCalledWith(url, 'delete');
//     });
//   });
});
