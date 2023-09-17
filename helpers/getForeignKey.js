async function getForeignKey(valor, tabla, connection) {
    try {
      const claveForanea = `id${tabla}`;
      
      const [rows] = await connection.execute(`SELECT ${claveForanea} FROM ${tabla} WHERE ${tabla} = ?`, [valor]);
      
      if (rows.length > 0) {
        
        return rows[0][claveForanea];
      } else {
        const [result] = await connection.execute(`INSERT INTO ${tabla} (${tabla}) VALUES (?)`, [valor]);
        return result.insertId;
      }
    } catch (error) {
      console.error('Error al obtener o insertar la clave foránea:', error);
      throw error;
    }
  }

module.exports  = {
    getForeignKey
}