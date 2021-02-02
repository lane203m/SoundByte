import sys
import json

thisdict = {
    "songs": [
        {
            "songName": "song1New",
            "author": "auth1",
            "features": {
                "bpm": 100,
                "key": "A",
                "scale": "Minor" 
            }
        },
        {
            "songName": "song2New",
            "author": "auth2",
            "features": {
                "bpm": 200,
                "key": "B",
                "scale": "Major" 
            }
        },
        {
            "songName": "song3New",
            "author": "auth3",
            "features": {
                "bpm": 300,
                "key": "C",
                "scale": "Minor" 
            }
        }

    ]


}

output = json.dumps(thisdict)
print(output)
sys.stdout.flush()