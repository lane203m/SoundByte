import sys
import json
import math

keyDict={
    'A':{'major':{0,2,4,5,7,9,11},'minor':{0,2,3,5,7,9,11}},
    'Ab':{'major':{11,1,3,4,6,8,10},'minor':{11,1,2,4,6,8,10}},
    'B':{'major':{1,2,4,6,7,9,11},'minor':{1,2,4,5,7,9,11}},
    'Bb':{'major':{0,1,3,5,6,8,10},'minor':{0,1,3,4,6,8,10}},
    'C':{'major':{0,2,3,5,7,8,10},'minor':{0,2,3,5,6,8,10}},
    'C#':{'major':{1,3,4,6,8,9,11},'minor':{1,3,4,6,7,9,11}},
    'D':{'major':{0,2,4,5,7,9,10},'minor':{0,2,4,5,7,8,10}},
    'E':{'major':{0,2,4,6,7,9,11},'minor':{0,2,4,6,7,9,10}},
    'Eb':{'major':{11,1,3,5,6,8,10},'minor':{11,1,3,5,6,8,9}},
    'F':{'major':{0,1,3,5,7,8,10},'minor':{11,1,3,5,7,8,10}},
    'F#':{'major':{1,2,4,6,8,9,11},'minor':{0,2,4,6,8,9,11}},
    'G':{'major':{0,2,3,5,7,9,10},'minor':{0,1,3,5,7,9,10}},
}

def PercentBPM(InSong,LibSong):
    if (InSong > LibSong):
        return (LibSong/InSong)
    else:
        return (InSong/LibSong)

def PercentComNotes(InKey,InScale,LibKey,LibScale):
    simNotes = 0
    inSet = set(list(keyDict[InKey][InScale]))
    libList = list(keyDict[LibKey][LibScale])
    
    commonNotes = inSet.intersection(libList)
    return len(commonNotes)/7

inputValue = json.loads(sys.argv[1])

with open('./Libraries/songLibrary/library.json') as f:
    data = json.load(f)

songResults = list() 

for d in data['songs']:
    score = PercentBPM(d['features']['bpm'],inputValue['features']['bpm']) + PercentComNotes(d['features']['key'],d['features']['scale'],inputValue['features']['key'],inputValue['features']['scale'])
    score = 100*score/2
    d['score'] = score
    songResults.append(d)

print(json.dumps(songResults))
sys.stdout.flush()