import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Save in public/temp
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Add timestamp to filename
  },
});

export const upload = multer({
  storage,
});

// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/temp");
//   },
//   filename: function (req, file, cb) {
//     // cb(null, file.originalname);
//     cb(null, `${Date.now()}-${file.originalname}`);

//     // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     // cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// export const upload = multer({

//   storage,
// });

/*..................................................................................*/

// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {

//       cb(null, file.originalname)
//     }
//   })

// export const upload = multer({
//     storage,
// })
