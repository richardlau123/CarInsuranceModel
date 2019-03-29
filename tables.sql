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
FOREIGN KEY (LicenseNumber) references Driver(LicenseNumber) on delete cascade
);

CREATE TABLE Vehicle(
Model char(20),
VIN char(20) PRIMARY KEY,
LicensePlate char(20), 
Brand char(20), 
ModelYear int, 
LicenseNumber char(20) not null, 
FOREIGN KEY (LicenseNumber) references Driver(LicenseNumber) on delete cascade
);

CREATE TABLE VehicleFuel(
VIN char(20) PRIMARY KEY,
FuelType char(20),
FOREIGN KEY (VIN) references Vehicle(VIN) on delete cascade
);

CREATE TABLE Agent(
EmployeeID char(20) PRIMARY KEY, 
name char(20)
);

CREATE TABLE CrashAgent(
EmployeeID char(20) PRIMARY KEY,
AuthorizationType char(20),
FOREIGN KEY (EmployeeID) references Agent(EmployeeID) on delete cascade
);

CREATE TABLE InsuranceAgent(
EmployeeID char(20) PRIMARY KEY,
InsuranceSpecialization char(20),
FOREIGN KEY (EmployeeID) references Agent(EmployeeID) on delete cascade
);

CREATE TABLE CrashReport(
ReportID int PRIMARY KEY,
CrashDate date not null,
VIN char(20) not null,
LicenseNumber char(20) not null,
EmployeeID char(20) not null,
FOREIGN KEY (LicenseNumber) references Driver(LicenseNumber) on delete cascade,
FOREIGN KEY (EmployeeID) references CrashAgent(EmployeeID) on delete cascade,
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
FOREIGN KEY (StartDate) references ContractDates(StartDate) on delete cascade,
FOREIGN KEY (EmployeeID) references InsuranceAgent(EmployeeID) on delete cascade,
FOREIGN KEY (CreditCardNumber) references PaymentDetails(CreditCardNumber) on delete cascade,
FOREIGN KEY (VIN) references Vehicle(VIN) on delete cascade
);

CREATE TABLE Invoice(
InvoiceNumber char(20) PRIMARY KEY,
Cost int, 
InsuranceID char(20) ,
FOREIGN KEY (InsuranceID) references Insurance(InsuranceID) on delete cascade
);

INSERT INTO Driver(LicenseNumber, Name, Address, PhoneNumber, DateOfBirth) 
VALUES ('H284859', 'JoeSmith', '1011 Queen St, Smallsville', '6046044040', '1980-01-01'),
('H283495','Juan Garcia', '101 1st St, Smallsville', '2044467890', '1995-05-10'),
('B858693', 'Jackson Polluck', '1600 Pennsylvania Avenue NW, Washington', '1234567890', '1991-12-11'),
('G161002', 'Marshall Mathers', '5b 1440 Lake St, Gotham', '9998887777', '1964-03-30'),
('H683729', 'Crangis McBasketball', '400 5th Ave, Levittown', '4042233298', '1923-01-31'),
('A194582', 'Peter Roberts', '500 Alberta st, Vancouver','7783981243', '1948-05-22'),
('L219384', 'Betty Chesser', '1834 38th Ave, Mission','2501858294', '1982-4-30'),
('C284958','Ana D Leonard','817 Terra St, Seattle','3602851758', '1997-8-1'),
('J184818','Michael Mix','4741 Pratt Ave, Maple Ridge','3912918593', '1984-3-7'),
('S391849','Freeda Qualls','4728 Pinnickinick St','2391851729', '1947-2-6'),
('R194819','James Nace','1467 Mutton Rd, Tacoma','3606951758', '1922-7-13'),
('J830174','Ryan Sanchez','555 Queens st, Jersey','3918572938', '1975-11-9'),

('A9F9AF1', 'HelloSmith', '1012 King St, New York', '2839185928', '1982-02-03'),
('8C1LF81','Juan Jacksons', '101 2nd St, York', '1957185282', '1997-02-20'),
('9J8J19F', 'Jack Lu', '1601 Pennsylvania Avenue NE, Washington', '1081758275', '1993-4-11'),
('G161003', 'Ken Chen', '5d 1540 Lake St, Gotham', '9185729175', '1974-04-30'),
('H683718', 'Crangis McBasketball', '500 6th Ave, Sydney', '4041825298', '1923-01-31'),
('A118582', 'Tony Blocks', '600 Alberta st, Vancouver','7781826243', '1948-05-22'),
('L219814', 'Linda Chess', '1488 41th Ave, Mission','2501182694', '1982-4-30'),
('C292958','Anna Leos','897 Mack St, Seattle','3601285758', '1997-8-1'),
('J116818','Mike Mich','4749 Maze Ave, Hope','3918172593', '1984-3-7'),
('S382849','Amanda Sams','4728 Pinnickinick St','2392876729', '1947-2-6'),
('R118619','Jimmy Nacel','1467 Pacific Rd, Tacoma','3601826758', '1922-7-13'),
('J828574','Willy Sanchezs','556 Queens st, Squamish','3911826938', '1975-11-9');


INSERT INTO EmergencyContact(PhoneNumber, Name, LicenseNumber)
VALUES 	(9847771234, 'Laura Croft', 'H284859'),
		(6518035570, 'Ron Swanson', 'H283495'),
		(7048866442, 'Miley Cyrus', 'B858693'),
		(2042233322, 'Max Miller','G161002'),
		(5106077754, 'Eli Manning', 'H683729');
        
INSERT INTO Vehicle(Model, VIN, LicensePlate, Brand, ModelYear, LicenseNumber)
VALUES 	('Civic', 'F728FJA8596729FB28', 'A29B02', 'Honda', 2016,'H284859'),
		('Stingray', 'GA92JC91091409FADC', 'HOTROD', 'Corvette', 2015, 'H284859'),
		('Challenger', 'GA928J1J991409FADC', 'A9C8A8', 'Dodge', 2012,'H284859'),
		('Mazda3', 'MA3J9F9H91JF91JF9S',NULL,'Mazda',2005,'H284859'),
		('86','JPMA3JJF8JJF91JF9S','JIAL18','Toyota',2018,'H284859'),
		('Cherokee','JPM81829682F91JF9S','ACDEJA','Jeep',1992,'H284859'),
		('180D','BB291J91FJA249GG21','91JSLL','Mercedes-Benz',1959,'H284859'),
		('Stingray', 'G728FJA1000729FB28', 'A9C1J9', 'Corvette', 2018, 'H283495'),
		('Odyssey', 'BB28FJA8596009GG21', '666EVL', 'Honda', 2001, 'B858693'),
		('Challenger', 'Y028XXA8296729XB00', 'ABC123', 'Dodge', 2012,'G161002'),
		('Accord', 'Z72AJAX8596765AB11', '897281JD', 'Honda', 2009,'H683729'),
		('Charger', 'JD3JF931IDF81HF9XH','DIV1BF','Dodge', 2008,'J830174'),
		('RX7', 'FB382JF391JF91JF9S',NULL,'Mazda',1983,'R194819'),
		('Mazda5','FB382JF81J8181JF9S','J81A89','Mazda',2009,'A9F9AF1'),
		('Wrangler','JPM81818301751JF9S','A81A71','Jeep',1996,'8C1LF81'),
		('S2000', 'BB28F175817249GG21', 'A8C81B', 'Honda', 2001, '9J8J19F'),
		('220S','BB2192J91JA249GG21','9JABCM','Mercedes-Benz',1965,'G161003')
		;

INSERT INTO PaymentDetails(CreditCardNumber, CreditCardCompany, expiryDate, name)
VALUES	('6789123400009999','Mastercard', '2023-10-01', 'Bob Harvey' ),
		('1000222233334444', 'Visa','2020-09-01', 'Angelina Jueves'),
		('1440199020021999', 'Visa', '2021-11-01', 'Christina Rojas'),
		('6000654644229897','Amex', '2023-12-02', 'Johnny Doe'),
		('5454123000991829','Mastercard', '2023-11-03', 'Billy Joe');


INSERT INTO Agent(EmployeeID, Name)
VALUES	('101', 'Joy'),
		('102', 'Jerry'),
		('103', 'Jim'),
		('104', 'Joe'),
		('105', 'Josh'),
		('106', 'Robert');

INSERT INTO CrashAgent(EmployeeID, AuthorizationType)
VALUES	('101', 'General'),
		('102', 'General'),
		('103', 'General'),
		('104', 'Supervisory'),
		('105', 'Commercial');

INSERT INTO InsuranceAgent(EmployeeID, InsuranceSpecialization)
VALUES	('101', 'General'),
		('102', 'Commercial'),
		('103', 'Sport'),
		('104', 'Family'),
		('105', 'Family');
		
INSERT INTO CrashReport(ReportID, CrashDate, VIN, licenseNumber, employeeID)
VALUES	('10101','2016-02-01','F728FJA8596729FB28', 'H284859', '101'),
		('20010','2018-12-03','G728FJA1000729FB28', 'H283495', '101'),
		('15457','2017-01-11','BB28FJA8596009GG21', 'B858693', '101'),
		('10234','2018-03-02','Y028XXA8296729XB00', 'G161002', '102'),
		('10102','2019-01-02', 'Z72AJAX8596765AB11', 'H683729', '101');

INSERT INTO ContractDates(StartDate, ValidDate)
VALUES	('2018-01-01', '2019-01-01'),
		('2018-04-14', '2019-04-14'),
		('2017-10-11', '2018-10-11'),
		('2017-09-30', '2018-09-30'),
		('2017-06-05', '2018-06-05');

INSERT INTO Insurance(InsuranceID, StartDate, CreditCardNumber, VIN, EmployeeID)
VALUES	('10004', '2018-01-01', '6789123400009999', 'F728FJA8596729FB28', '101'),
		('29059', '2018-04-14', '1000222233334444', 'G728FJA1000729FB28', '103'),
		('23040', '2017-10-11', '1440199020021999',  'BB28FJA8596009GG21', '101'),
		('34204', '2017-10-11', '6000654644229897', 'Y028XXA8296729XB00', '101'),
		('10234', '2017-06-05', '5454123000991829', 'Z72AJAX8596765AB11', '105');
        
INSERT INTO Invoice(InvoiceNumber, cost, insuranceID)
VALUES	('12395',1200,'29059'),
		('56295',4300,'10004'),
		('12234',19050,'23040'),
		('23123',60000,'34204'),
		('12785',1200,'10234');
