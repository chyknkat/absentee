CREATE TABLE [Absentee].[Absence]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [UserId] INT NOT NULL, 
    [StartDate] DATE NOT NULL, 
    [EndDate] DATE NOT NULL, 
    [Comments] VARCHAR(MAX) NULL, 
    [Active] BIT NOT NULL, 
    CONSTRAINT [FK_Absence_ToUser] FOREIGN KEY ([UserId]) REFERENCES [Absentee].[User]([Id])
)
