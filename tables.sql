CREATE TABLE Driver(
LicenseNumber char(20) PRIMARY KEY,
Name char(20),
Address char(40),
PhoneNumber char(20),
DateOfBirth date
);

CREATE TABLE EmergencyContact(
PhoneNumber char(20) PRIMARY KEY, 
Name char(20), 
LicenseNumber char(20), 
FOREIGN KEY (LicenseNumber) references Driver(LicenseNumber)
);

CREATE TABLE Vehicle(
Model char(20),
VIN char(20) PRIMARY KEY,
LicensePlate char(20), 
Brand char(20), 
ModelYear int, 
LicenseNumber char(20) not null, 
FOREIGN KEY (LicenseNumber) references Driver(LicenseNumber)
);

CREATE TABLE VehicleFuel(
VIN char(20) PRIMARY KEY,
FuelType char(20),
FOREIGN KEY (VIN) references Vehicle(VIN)
);

CREATE TABLE Agent(
EmployeeID char(20) PRIMARY KEY, 
name char(20)
);

CREATE TABLE CrashAgent(
EmployeeID char(20) PRIMARY KEY,
AuthorizationType char(20),
FOREIGN KEY (EmployeeID) references Agent(EmployeeID)
);

CREATE TABLE InsuranceAgent(
EmployeeID char(20) PRIMARY KEY,
InsuranceSpecialization char(20),
FOREIGN KEY (EmployeeID) references Agent(EmployeeID)
);

CREATE TABLE CrashReport(
ReportID int PRIMARY KEY,
CrashDate date not null,
VIN char(20) not null,
LicenseNumber char(20) not null,
EmployeeID char(20) not null,
FOREIGN KEY (LicenseNumber) references Driver(LicenseNumber),
FOREIGN KEY (EmployeeID) references CrashAgent(EmployeeID),
FOREIGN KEY (VIN) references Vehicle(VIN) on delete cascade
);

CREATE TABLE PaymentDetails(
CreditCardNumber char(20) PRIMARY KEY, 
CreditCardCompany char(20), 
ExpiryDate date,
name char(20)
);

CREATE TABLE ContractDates(
	StartDate date PRIMARY KEY,
	ValidDate date
);

CREATE TABLE Insurance(
InsuranceID char(20) PRIMARY KEY,
StartDate date not null, 
CreditCardNumber char(20) not null,
VIN char(20) not null, 
EmployeeID char(20) not null,
FOREIGN KEY (StartDate) references ContractDates(StartDate),
FOREIGN KEY (VIN) references Vehicle(VIN),
FOREIGN KEY (EmployeeID) references InsuranceAgent(EmployeeID),
FOREIGN KEY (CreditCardNumber) references PaymentDetails(CreditCardNumber)
);

CREATE TABLE Invoice(
InvoiceNumber char(20) PRIMARY KEY,
Cost int, 
InsuranceID char(20) ,
FOREIGN KEY (InsuranceID) references Insurance(InsuranceID)
);

