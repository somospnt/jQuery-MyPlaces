Español

Este plugin está en bitbucket y en github.
Si se quiere hacer un commit se debe modificar lo siguiente:

En la carpeta .git que se encuentra oculta en el proyecto, se debe abrir el archivo
config y modificar [remote "origin"] por completo por lo siguiente:


[remote "origin"]
	url = https://github.com/somospnt/jQuery-MyPlaces.git
	fetch = +refs/heads/master:refs/remotes/origin/master

	url = https://bitbucket.org/somospnt/jquery-myplaces.git
	fetch = +refs/heads/*:refs/remotes/origin/*


English

Before any operation to the repository you must to edit the config 
file (from the .git hided folder) and replace the contents of [remote "origin"]

[remote "origin"]
	url = https://github.com/somospnt/jQuery-MyPlaces.git
	fetch = +refs/heads/master:refs/remotes/origin/master

	url = https://bitbucket.org/somospnt/jquery-myplaces.git
	fetch = +refs/heads/*:refs/remotes/origin/*