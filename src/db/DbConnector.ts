import { Client } from "pg";
import dbConfig from "./dbConfig";

class DbConnector {
  private static instance: DbConnector;
  private client: Client;
  private isConnected = false;

  private constructor() {
    this.client = new Client(dbConfig);
  }

  public static getInstance(): DbConnector {
    if (!DbConnector.instance) {
      DbConnector.instance = new DbConnector();
    }

    return DbConnector.instance;
  }

  public async query(query: string, values: any[] = []) {
    if (!this.isConnected) {
      await this.connect();
    }
    try {
      return await this.client.query(query, values);
    } catch (error) {
      console.error("database query failed", error);
      throw error;
    }
  }

  public async connect() {
    if (!this.isConnected) {
      try {
        await this.client.connect();
        this.isConnected = true;
        console.log("Connected to database");
      } catch (error) {
        console.error("database connection failed", error);
        throw error;
      }
    }
  }

  public async disconnect() {
    if (this.isConnected) {
      await this.client.end();
      this.isConnected = false;
      console.log("Disconnect from database");
    }
  }
}

export default DbConnector;
