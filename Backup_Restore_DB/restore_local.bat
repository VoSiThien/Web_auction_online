set pg_env="C:\Program Files\PostgreSQL\13\bin"
%pg_env%\dropdb.exe -h localhost -p 5433 -U postgres -d AuctionOnline_db
%pg_env%\createdb.exe -h localhost -p 5433 -U postgres -d AuctionOnline_db
%pg_env%\psql.exe -h localhost -p 5433 -U postgres -d AuctionOnline_db < AuctionOnline_DB.sql
pause
