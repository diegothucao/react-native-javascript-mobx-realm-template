# react-native-javascript-mobx-realm-example
This is an essential example to build react-native app using Javascript, Mobx and Realm

1. Clone the [repo](https://github.com/diegothucao/react-native-javascript-mobx-realm-template)
2. `yarn install` OR `npm install`
3. `react-native eject`
4. `react-native link realm`
5. `react-native run-ios` OR `react-native run-android`

Define model 
```javascript 
export const CauseName = "Cause"
export const UserName = "User"
export const DealObjectName = "Deal"

export const CauseSchema = {
    name: CauseName,
    properties: {
      name: {type: 'string'}
    }
  }

  export const UserSchema = {
    name: UserName,
    properties: {
      avatar:  {type: 'string'},
      name: {type: 'string'}
    }
  } 

  export const DealSchema = {
    name: DealObjectName,
    primaryKey: 'key',
    properties: {
        key: {type: 'string', default: ""},
        dealType: {type: 'string', default: ""},
        title: {type: 'string', default: ""},
        price: {type: 'double', default: 0.00},
        makerPercentage: {type: 'double', default: 0.00},
        description: {type: 'string', default: ""},
        tags: {type: 'string', default: ""},
        url: {type: 'string', default: ""},
        media: {type: 'string[]', default: []},
        user: {type: UserName, default: undefined},
        cause: {type: CauseName, default: undefined}
    }
  }

export const realmMain = new Realm({schema: [CauseSchema, DealSchema, UserSchema]})
```

Define store 
```javascript 


import { observable, action, runInAction } from 'mobx'
import ajax from '../util/ajax'
import { realmMain, DealObjectName } from './../realmModel/RealmFactory'

export default class AppStore {
    @observable isLoading = true
    @observable isFailure = false
    @observable searchTerm = observable.box("")
    @observable deals = realmMain.objects(DealObjectName)
    @observable currentDealId = null

    constructor() {
        this.searchTerm.observe( (value) => {
            this.fetchDeals(value.newValue)
        }, true)
    }

    async fetchDeals() {
        ajax.fetchDealSearchResults(this.searchTerm).then(data => {
            runInAction(() => {
                this.isLoading = false
                data.forEach(item => {
                    realmMain.write(() => {
                        realmMain.create(DealObjectName, item, true)
                      })
                  })

                  if (this.searchTerm.length > 0) {
                    this.deals = realmMain.objects(DealObjectName).filtered('title CONTAINS[c] "' + this.searchTerm + '"')
                }else {
                    this.deals = realmMain.objects(DealObjectName)
                }
            })
        })
    }

    @action setSearchTerm(searchStr) {
        this.searchTerm.set(searchStr)
    }

    @action
    setCurrentDeal(dealId) {
        this.currentDealId = dealId
    }

    @action
    unsetCurrentDeal() {
        this.currentDealId = null
    }
}
```
If you see any issue, please do not hesitate to create an issue here or can contact me via [Email](cao.trung.thu@gmail.com) or [Linkedin](https://www.linkedin.com/in/diegothucao/)

Thanks

references
1. https://facebook.github.io/react-native/docs/tutorial
2. https://github.com/jscomplete/react-native-essential-training
3. https://mobx.js.org
4. https://www.tutorialspoint.com/es6
5. https://realm.io/docs/javascript/latest/#filtering
