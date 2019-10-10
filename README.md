
 # **Project 3**       **The Malaria Project **   
 
 Our inspiration for this project was the video Inside Bill's Brain: Decoding Bill Gates   
 (https://youtu.be/aCv29JKmHNY)


## Data Source
https://ourworldindata.org/malaria

## Loading Data

**Step 1:  Data Clean-Up

Data clean-up was done beginning with the two raw CSVs in the ETL folder, “malaria-deaths-by-age” and “malaria-prevalence-vs-gdp-per-capita.”  The resulting CSV that feeds malaria_db is called “cleaned_2000_2008_2017.”  If clean-up needs to be re-done, open the IPYNB file “data_cleanup” by launching a Jupyter Notebook from the terminal.  Run all code to create the CSV:

![alt text](https://raw.githubusercontent.com/jschwan1282/Project-3/master/images/pandas1.JPG)


**Step 2:  Create Connection to PostgreSQL Database

With the “cleaned_2000_2008_2017” CSV now ready, open the IPYNB file “postgres_conn” and run all lines:

![alt text](https://raw.githubusercontent.com/jschwan1282/Project-3/master/images/pandas2.JPG)

Open pgAdmin and ensure that “malaria_db” and its accompanying table “tables_000817” have been created:
![alt text](https://raw.githubusercontent.com/jschwan1282/Project-3/master/images/malaria_db.JPG)
![alt text](https://raw.githubusercontent.com/jschwan1282/Project-3/master/images/table_000817.JPG)


PostgreSQL requires that a Primary Key be added.  In pgAdmin, follow these instructions to assign a Primary Key: open malaria_db, click on schema, right click table_000817, click query tool, run this code:  
![alt text](https://raw.githubusercontent.com/jschwan1282/Project-3/master/images/altertable.JPG)

The PostgreSQL database should now be ready to use in the Flask App.
