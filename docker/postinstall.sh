docker exec -it superset-appli superset fab create-admin \
              --username admin \
              --firstname Superset \
              --lastname Admin \
              --email admin@superset.com \
              --password admin

docker exec -it superset-appli superset db upgrade

docker exec -it superset-appli superset init
