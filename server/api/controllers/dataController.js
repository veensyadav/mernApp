const AppError = require("../../utill/appError");
const catchAsync = require("../../utill/catchAsync");
const db = require("../../db-setup");
const dataSet = db.dataSet


/* api to show all data  */

exports.listOfData = catchAsync(async (req, res, next) => {
  const data = await dataSet.findAll({    
    attributes: ['Timestamp', "Y-B(KV)", "R-Y(KV)", "B-R (KV)", "APPARENT POWER (MVA)", "REACTIVE POWER (MVAR)", "ACTIVE ENERGY (MWH)", "POWER FACTOR", "ACTIVE POWER (MW)", "Y (A)", "R(A)", "B(A)", "FREQUENCY(HZ)"],
    limit: 200
  }, );

  let date = data.map((e) => e.Timestamp);
  const xdate = date.map((x) => new Date(x * 1000));  

  data.map((e, i) => {
    e.Timestamp = xdate[i];
  }); 

  return res.send({
    object: "List of Data Details",
    data: data,
    message: "Get All List of Data Successfully",
  });
});



