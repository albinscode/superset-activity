# Installation and configuration

See for details: https://hub.docker.com/r/apache/superset

But simply:

~~~
docker-compose up
./postinstall.sh
~~~

Then you can log with admin/admin to http://localhost:8080/login

# Architecture

* Data will be extracted through Gilab API.
* Data will be pushed to superset-db
* Superset will allow to display dashboards

# Automatic configuration

The best way seems to use the API: https://superset.apache.org/docs/api/

It will allow to create new database, datasets, etc...

To have examples, the best way is to use the GUI of Superset and view network requests ;)

## Set up data base

http://localhost:8080/api/v1/database/
{"database_name":"MySQL","engine":"mysql","configuration_method":"dynamic_form","catalog":[{"name":"","value":""}],"parameters":{"host":"superset-db","port":"3306","database":"superset","username":"superset","password":"superset"},"encrypted_extra":"{}"}
