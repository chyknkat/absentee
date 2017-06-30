CREATE TABLE [Absentee].[Absence]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [UserId] INT NOT NULL, 
    [StartDate] DATETIME NOT NULL, 
    [EndDate] DATETIME NOT NULL, 
    [Comments] VARCHAR(MAX) NULL, 
    CONSTRAINT [FK_Absence_ToUser] FOREIGN KEY ([UserId]) REFERENCES [Absentee].[User]([Id])
)
