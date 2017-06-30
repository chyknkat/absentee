CREATE TABLE [Absentee].[User]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [FirstName] VARCHAR(50) NOT NULL, 
    [LastName] VARCHAR(50) NULL, 
    [FullName] VARCHAR(100) NULL, 
    [Team] VARCHAR(50) NULL, 
    [Active] BIT NOT NULL 
)
