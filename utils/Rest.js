// module.exports.parseRequestOutput = (response, format = "json") => {
//   return new Promise((resolve, reject) => {
//     switch (format) {
//       case "json":
//         response.json()
//           .then(json => resolve(json))
//           .catch(error => reject(error));
//       case "text":
//         response.text()
//           .then(text => resolve(text))
//           .catch(error => reject(error));
//       case "buffer":
//         response.buffer()
//           .then(buffer => resolve(buffer))
//           .catch(error => reject(error));
//       default:
//         reject("Invalid response format specified.");
//     }
//   });
// }

module.exports.parseRequestOutputToJson = async (response) => {
  return await response.json();
};

module.exports.buildUrl = (base, version, endpoint) => {
  return `${base}/v${version}${endpoint}`;
}