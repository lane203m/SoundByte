#!/usr/bin/env python
# coding: utf-8

# In[2]:


import sys
import json
thisdict = {
    "songs": [
        {
            "songName": "songE",
            "author": "auth1",
            "features": {
                "bpm": 100,
                "key": "A",
                "scale": "Minor" 
            }
        },
        {
            "songName": "song2",
            "author": "auth2",
            "features": {
                "bpm": 200,
                "key": "B",
                "scale": "Major" 
            }
        },
        {
            "songName": "song3",
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


# In[ ]:




