import { getConnection, querys, sql } from "../database";

export const getProducts = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllProducts);
    const resultFa = await pool.request().query(querys.getAllFamilies);
    let json = {}
    for (let i = 0; i < resultFa.recordset.length; i++) {
      json[resultFa.recordset[i].DESCFAM] = []
      for (let x = 0; x < result.recordset.length; x++) {
        if (resultFa.recordset[i].DESCFAM == result.recordset[x].DESCFAM) {
          json[resultFa.recordset[i].DESCFAM].push(result.recordset[x])
        }
      }
    }
    res.json(json);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewProduct = async (req, res) => {
  const { name, description } = req.body;
  let { quantity } = req.body;

  // validating
  if (description == null || name == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  if (quantity == null) quantity = 0;

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.Text, description)
      .input("quantity", sql.Int, quantity)
      .query(querys.addNewProduct);

    res.json({ name, description, quantity });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query(querys.getProducById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query(querys.deleteProduct);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTotalProducts = async (req, res) => {
  const pool = await getConnection();

  const result = await pool.request().query(querys.getTotalProducts);
  console.log(result);
  res.json(result.recordset[0][""]);
};

export const updateProductById = async (req, res) => {
  const { description, name, quantity } = req.body;

  // validating
  if (description == null || name == null || quantity == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.Text, description)
      .input("quantity", sql.Int, quantity)
      .input("id", req.params.id)
      .query(querys.updateProductById);
    res.json({ name, description, quantity });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const login = async (req, res) => {
  const { codcli, pass } = req.body;
  console.log(codcli)
  // validating
  if (codcli == null || pass == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("codcli", sql.Int, codcli)
      .input("pass", sql.VarChar, pass)
      .query(querys.login);
    if (result.recordset.length != 0) {
      res.json(result.recordset);
    } else {
      res.status(401);
    res.send("Usuario o contraseña erronea");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


export const saveOrder = async (req, res) => {
  const { order, codcli, notes } = req.body;

  console.log(req.body)
  console.log(codcli)
  // validating
  if (order == null, codcli == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(querys.lastOrder);
    if (result.recordset[0].ID == null) {
      result.recordset[0].ID = 1
    }

    await pool
      .request()
      .input("id", sql.Int, result.recordset[0].ID)
      .input("codcli", sql.Int, codcli)
      .input("notes", sql.VarChar, notes)
      .query(querys.insertCabe);

    for (let i = 0; i < order.length; i++) {
      console.log(order[i])
      await pool
        .request()
        .input("codart", sql.VarChar, order[i].CODART)
        .input("orderid", sql.Int, result.recordset[0].ID)
        .input("notes", sql.VarChar, order[i].ARTNOTAS)
        .input("quantity", sql.Int, order[i].UNIDADES)
        .query(querys.insertLine);
    }

    res.json({ order, codcli, notes });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
