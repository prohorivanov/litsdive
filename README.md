## NODEJS
[install on an ubuntu node js](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server)


## NGINX
[install on an ubuntu nginx](https://www.digitalocean.com/community/tutorials/nginx-ubuntu-16-04-ru)


## JENKINS

```
apt-get install openjdk-7-jdk && openjdk-7-jre
wget -q -O - http://pkg.jenkins-ci.org/debian/jenkins-ci.org.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins-ci.org/debian binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins

```

config jenkins = /var/lib/jenkins/config.xml


## SENTRY
```
sudo apt-get install mysql-server
sudo apt-get install mysql-client
mysql -u root -p12345
CREATE DATABASE `sentry`;


wget pypi.python.org/packages/2.7/s/setuptools/setuptools-0.6c11-py2.7.egg
sudo sh setuptools-0.6c11-py2.7.egg
sudo apt-get install python-dev
sudo easy_install sentry
sudo apt-get install python-mysqldb

```

[install sentry](http://sentry.readthedocs.org/en/latest/quickstart)



## SYSTEMD
[configure systemd](https://www.digitalocean.com/community/tutorials/how-to-configure-a-linux-service-to-start-automatically-after-a-crash-or-reboot-part-1-practical-examples)

folder in project `systemd`
```
sudo systemctl enable service.service
sudo systemctl daemon-reload
sudo systemctl restart service.service
sudo reboot
```


## MONGO

remove mongo
```
sudo apt-get purge mongodb mongodb-clients mongodb-server mongodb-dev sudo apt-get purge mongodb-10gen
sudo apt-get purge mongodb-10gen mongodb-org
sudo apt-get autoremove
```

backup
```
mongodump backup - in folder progect
mongorestore ./dump/ in folder progect
mongorestore --collection unicorns backup/learn/unicorns.bson
mongoexport --db learn -collection unicorns
mongoexport --db learn -collection unicorns --csv -fields name,weight,vampires
```

SYSTEMD start
`sudo systemctl enable mongod.service`



## hosting
[Hetzner](www.hetzner.com)
[https://robot.your-server.de/server](https://robot.your-server.de/server)
