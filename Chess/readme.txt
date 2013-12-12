CHESS GAME 

By: Kristofer Escobar and Savith


NOTES:

1) ENTERING GAME ID: A small bug in the camera controls prevents the user from clicking on dat.gui text box. To overcome this and enter the GAME ID, the TAB key can be pressed, which will focus on the textbox, and the GAME ID can be entered.

2) ANIMATIONS: Due to the way it was implmented, the game may crash if the models take too long to load. I found that on my local machine it worked perfectly, but when hosted on the server it took longer to load the models and materials. I changed the interval at which the models are loaded, which allows them to load properly on the server. If the models do not load in time, refreshing the page may help.

 
PLAYING THE GAME:

1) If the chess visualizer starts and polls the server and the GAMEOVER property is set to "true", then it will load the state of the board when the game finished. At that point the moves have been stored and the entire game can be re-played.

2)If the GAMEOVER = FALSE and the game is still running, it will load the current state and then continue polling for new moves.
