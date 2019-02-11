## store flow

store = Vuex.store

### 1 - fetch user/<id>

 * to store -> `User` data
 * to store -> `UAVs` data
 * to store -> `Sensors` data
 * to store -> `Projects` data

### 2 - fetch project/id for project in store.Projets
 
 * update each `project` in `store.Projects` where `project.id` == `object.project.id`
 * to store `Personnel` if not in store.Personnel
 * store {"id": ""}


### 3 - fetch mission/<id> for mission based on id
 * update each `Projects.Missions.mission