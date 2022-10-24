import psycopg2
import pandas as pd


class Database:
    def connect(self, database, user, password, host, port):
        self.__db = psycopg2.connect(
            database=database, user=user, password=password, host=host, port=port
        )

    def disconnect(self):
        if self.__db is None:
            return

        self.__db.close()
        del self.__db

    def list_tables(self):
        return self.__execute_query(
            """
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema='public'
            AND table_type='BASE TABLE'
        """
        )

    def enter_table(self, name):
        if self.__db is None:
            raise NameError("Need to connect to a database first.")

        return Table(self, name)

    def create_table(self, name, keys):
        table_rows = [f"{key} TEXT" for key in keys]
        table_rows.insert(0, "id SERIAL PRIMARY KEY")
        table_rows = ",".join(table_rows)

        query = f"CREATE TABLE IF NOT EXISTS {name} ({table_rows})"
        self.__execute_query(query)

        return Table(self, name)

    def __execute_query(self, query):
        if self.__db is None:
            raise NameError("Need to connect to a database first.")

        cur = self.__db.cursor()
        cur.execute(query)

        try:
            results = cur.fetchall()
        except:
            results = None

        cur.close()
        self.__db.commit()

        return results


class Table:
    def __init__(self, db, name):
        self.__db = db
        self.name = name

    def delete(self):
        self.__execute_query(f"DROP TABLE {self.name}")

    def get_data_bulk(self):
        return self.__execute_query(f"SELECT * from {self.name}")

    def add_data_bulk(self, data):
        keys = data.columns
        table_rows = ",".join(keys)

        insert_query = f"INSERT INTO {self.name}({table_rows})"
        values_query = []

        for _, row in data.iterrows():
            row_values = [str(value).replace("'", "''") for _, value in row.iteritems()]
            row_values = "(" + ",".join([f"'{value}'" for value in row_values]) + ")"
            values_query.append(row_values)

        values_query = "VALUES" + ",".join(values_query)
        self.__execute_query(f"{insert_query} {values_query}")

    def delete_data(self, id):
        self.__execute_query(f"DELETE FROM {self.name} WHERE id = {id};")

    def change_attribute(self, id, attribute, value):
        self.__execute_query(
            f"UPDATE {self.name} SET {attribute} = '{value}' WHERE id = {id};"
        )

    def __execute_query(self, query):
        try:
            return self.__db._Database__execute_query(query)
        except:
            raise NameError(f"{self.name} doesn't exist.")
