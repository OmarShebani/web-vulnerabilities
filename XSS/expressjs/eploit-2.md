Stored XSS is an attack where the malicious script is permanently stored on the targeted server, then served an displayed to other users when they access a particular page or a resource.

This type of vulnerability can carry out any of the actions that are applicable to the impact of Reflected XSS. however, Stored XSS has a bigger impact because the attacker does not need to find a way to induce the victim to make a request that contains their exploit unlike Reflected XSS. Rather, the attacker places their exploit in the application itself and simply waits for the users to encounter it.

An example of Stored XSS is provided in *stored-xss-2.js*; if you run the server and access it on your browser you will open the Comments Section, you will notice that an alert pops up which means that a scripts has been executed; the script came from a malicious hacker that posted a comment containing the script then was stored in the server, therefore, displaying his comment when you were served accessing the page leading to executing it.

**Solution:** Sanitizing any input provided by the user like how I did in *fix-2.js* script.