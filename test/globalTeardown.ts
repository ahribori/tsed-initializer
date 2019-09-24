import db from '../src/db/sequelize';

const globalTearDown = async () => {
  await db.close();
};

export default globalTearDown;
