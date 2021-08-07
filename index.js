let createEmployeeRecord = function(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
};

let createEmployeeRecords = function(employeeData) {
    return employeeData.map(function(arr) {
        return createEmployeeRecord(arr)
    })
};

let createTimeInEvent = function(person, timeStamp) {
    let [date, hour] = timeStamp.split(" ")
    person.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(hour, 10),
        date,
    })
    return person
};

let createTimeOutEvent = function(person, timeStamp) {
    let [date, hour] = timeStamp.split(" ")
    person.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(hour, 10),
        date,
    })
    return person
};

let hoursWorkedOnDate = function(employee, desiredDate) {
    let timeIn = employee.timeInEvents.find(function(person) {
        return person.date === desiredDate
    });
    let timeOut = employee.timeOutEvents.find(function(person) {
        return person.date === desiredDate
    });
    return (timeOut.hour - timeIn.hour) / 100
};

let wagesEarnedOnDate = function(employee, desiredDate) {
    let wages = hoursWorkedOnDate(employee, desiredDate)
    let pay = wages * employee.payPerHour
    return parseFloat(pay.toString())
};

let allWagesFor = function(employee) {
    let dates = employee.timeInEvents.map(function(person){
        return person.date
    });
    let paycheckAmount = dates.reduce(function(memo, desiredDate) {
        return memo + wagesEarnedOnDate(employee, desiredDate)
    }, 0);
    return paycheckAmount;
};

let calculatePayroll = function(employeeRecords) {
    return employeeRecords.reduce(function(memo, record) {
        return memo + allWagesFor(record)
    }, 0)
};

let findEmployeeByFirstName = function(employeeRecords, name) {
    return employeeRecords.find(function(name){
        return name.firstName
    })
}