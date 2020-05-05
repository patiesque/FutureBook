import knex from "knex";

export abstract class BaseDB {
  protected connection = knex({
    client: "mysql",
    connection: {
      host: "ec2-18-229-236-15.sa-east-1.compute.amazonaws.com",
      port: 3306,
      user: "patricia",
      password: "AejHS7$R5$D9kWNPp1v~",
      database: "bouman-patricia"
    }
  });
}
