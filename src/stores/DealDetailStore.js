import { observable, action } from 'mobx'
import ajax from '../util/ajax'
import { realmMain, DealObjectName } from './../realmModel/RealmFactory'

export default class DealDetailStore {
    @observable isLoading = true
    @observable isFailure = false
    @observable deal = undefined

    @action async fetchDetail(dealId) {
        try {
            this.deal = realmMain.objectForPrimaryKey(DealObjectName, dealId)
            const data = await ajax.fetchDealDetail(dealId)    
            realmMain.write(() => {
                realmMain.create(DealObjectName, data, true)
              }) 
              this.deal = realmMain.objectForPrimaryKey(DealObjectName, dealId)
                this.isLoading = false
        } catch (e) {
                this.isLoading = false
                this.isFailure = true
        }
    }
}