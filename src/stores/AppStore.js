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