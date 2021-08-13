export const querys = {
  getAllProducts: "SELECT * FROM [DILOA].[dbo].[VAPP_ARTICULOS]",
  getProducById: "SELECT * FROM [DILOA].[dbo].[VAPP_ARTICULOS] Where CODART = @Id",
  addNewProduct:
    "INSERT INTO [webstore].[dbo].[Products] (name, description, quantity) VALUES (@name,@description,@quantity);",
  deleteProduct: "DELETE FROM [webstore].[dbo].[Products] WHERE Id= @Id",
  getTotalProducts: "SELECT COUNT(*) FROM webstore.dbo.Products",
  updateProductById:
    "UPDATE [webstore].[dbo].[Products] SET Name = @name, Description = @description, Quantity = @quantity WHERE Id = @id",
  login: "SELECT [CODCLI],[NOMCLI],[RAZON],[NIFCLI] FROM [DILOA].[dbo].[VAPP_CLIENTES] where CODCLI= @codcli and DIL_APPPASS= @pass",
  getAllFamilies: "SELECT DISTINCT [DESCFAM] FROM [DILOA].[dbo].[VAPP_ARTICULOS]",
  insertCabe: "INSERT INTO DIL_CABEPEDV ([IDPEDIDO], [CODCLI],[FECHA],[NOTAS],[TRASPASADO]) VALUES (@id, @codcli, GETDATE(), @notes, 'F');",
  insertLine: "INSERT INTO [DIL_LINEPEDI] ([CODART],[IDPEDIDO],[NOTAS],[UNIDADES]) VALUES (@codart, @orderid, @notes, @quantity);",
  lastOrder: "SELECT MAX([IDPEDIDO])+1 ID FROM DIL_CABEPEDV;"
};
