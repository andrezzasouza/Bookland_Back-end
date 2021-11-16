import connection from '../database/database.js';

async function product(req, res) {
  const bookId = req.params.id;

  try {
    const result = await connection.query(
      `
        SELECT * FROM "Books" 
        JOIN
          "Authors" ON "Authors".id = "Books".author_id
        JOIN
          "Books_categories" ON "Books_categories".book_id = "Books".id
        JOIN
          "Categories" ON "Categories".id = "Books_categories".category_id
        JOIN 
          "Category_groups" ON "Category_groups".id = "Categories".category_group_id
        WHERE 
          "Books".id = $1;
      `,
      [bookId],
    );

    // differentiate between book name and author name, don't get author id

    if (result.rowCount === 0) {
      return res.status(404).send("Sorry, we couldn't find this book.");
    }

    return res.status(200).send(result.rows[0]);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.sendStatus(500);
  }
}

export default product;
