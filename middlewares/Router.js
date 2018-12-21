var departmentRouter = require('../routes/addepartment');
var divisionRouter = require('../routes/division');
var valuesRouter = require('../routes/fetchvalues');
var employeeRouter = require('../routes/addemployee');
var awardrecogRouter = require('../routes/awardrecogination');
var submitqueryRouter = require('../routes/submitquery');
var commentRouter = require('../routes/comment');

module.exports = function(app) {
    app.use("/department",departmentRouter);
    app.use("/divisons",divisionRouter);
    app.use("/values",valuesRouter);
    app.use("/employees",employeeRouter);
    app.use("/awardrecog",awardrecogRouter);
    app.use("/query",submitqueryRouter);
    app.use("/comment",commentRouter);
};