Before any operation to the repository you must to edit the config 
file (from the .git hided folder) and replace the contents of [remote "origin"]

[remote "origin"]
	url = https://github.com/somospnt/jQuery-MyPlaces.git
	fetch = +refs/heads/master:refs/remotes/origin/master

	url = https://bitbucket.org/somospnt/jquery-myplaces.git
	fetch = +refs/heads/*:refs/remotes/origin/*