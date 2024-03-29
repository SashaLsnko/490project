import {
    Platform,
    Alert,
} from 'react-native'
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

export default class BleModule{
    constructor(){
	    this.isConnecting = false;
        this.initUUID();
        this.manager = new BleManager();
    }

    async fetchServicesAndCharacteristicsForDevice(device) {
        var servicesMap = {}
        var services = await device.services()

        for (let service of services) {
          var characteristicsMap = {}
          var characteristics = await service.characteristics()

          for (let characteristic of characteristics) {
            characteristicsMap[characteristic.uuid] = {
              uuid: characteristic.uuid,
              isReadable: characteristic.isReadable,
              isWritableWithResponse: characteristic.isWritableWithResponse,
              isWritableWithoutResponse: characteristic.isWritableWithoutResponse,
              isNotifiable: characteristic.isNotifiable,
              isNotifying: characteristic.isNotifying,
              value: characteristic.value
            }
          }

          servicesMap[service.uuid] = {
            uuid: service.uuid,
            isPrimary: service.isPrimary,
            characteristicsCount: characteristics.length,
            characteristics: characteristicsMap
          }
        }
        return servicesMap
    }

    initUUID(){
        this.readServiceUUID = [];
        this.readCharacteristicUUID = [];
        this.writeWithResponseServiceUUID = [];
        this.writeWithResponseCharacteristicUUID = [];
        this.writeWithoutResponseServiceUUID = [];
        this.writeWithoutResponseCharacteristicUUID = [];
        this.nofityServiceUUID = [];
        this.nofityCharacteristicUUID = [];
    }

    getUUID(services){
        this.readServiceUUID = [];
        this.readCharacteristicUUID = [];
        this.writeWithResponseServiceUUID = [];
        this.writeWithResponseCharacteristicUUID = [];
        this.writeWithoutResponseServiceUUID = [];
        this.writeWithoutResponseCharacteristicUUID = [];
        this.nofityServiceUUID = [];
        this.nofityCharacteristicUUID = [];

        for(let i in services){
            // console.log('service',services[i]);
            let charchteristic = services[i].characteristics;
            for(let j in charchteristic){
                // console.log('charchteristic',charchteristic[j]);
                if(charchteristic[j].isReadable){
                    this.readServiceUUID.push(services[i].uuid);
                    this.readCharacteristicUUID.push(charchteristic[j].uuid);
                }
                if(charchteristic[j].isWritableWithResponse){
                    this.writeWithResponseServiceUUID.push(services[i].uuid);
                    this.writeWithResponseCharacteristicUUID.push(charchteristic[j].uuid);
                }
                if(charchteristic[j].isWritableWithoutResponse){
                    this.writeWithoutResponseServiceUUID.push(services[i].uuid);
                    this.writeWithoutResponseCharacteristicUUID.push(charchteristic[j].uuid);
                }
                if(charchteristic[j].isNotifiable){
                    this.nofityServiceUUID.push(services[i].uuid);
                    this.nofityCharacteristicUUID.push(charchteristic[j].uuid);
                }
            }
        }

        console.log('readServiceUUID',this.readServiceUUID);
        console.log('readCharacteristicUUID',this.readCharacteristicUUID);
        console.log('writeWithResponseServiceUUID',this.writeWithResponseServiceUUID);
        console.log('writeWithResponseCharacteristicUUID',this.writeWithResponseCharacteristicUUID);
        console.log('writeWithoutResponseServiceUUID',this.writeWithoutResponseServiceUUID);
        console.log('writeWithoutResponseCharacteristicUUID',this.writeWithoutResponseCharacteristicUUID);
        console.log('nofityServiceUUID',this.nofityServiceUUID);
        console.log('nofityCharacteristicUUID',this.nofityCharacteristicUUID);
    }


    scan(){
        return new Promise( (resolve, reject) =>{
            this.manager.startDeviceScan(null, null, (error, device) => {
                if (error) {
                    console.log('startDeviceScan error:',error)
                    if(error.errorCode == 102){
                        this.alert('Enable your phone bluetooth and search again');
                    }
                    reject(error);
                }else{
                    resolve(device);
                }
            })

        });
    }


    stopScan(){
        this.manager.stopDeviceScan();
        console.log('stopDeviceScan');
    }


    connect(id){
        console.log('isConneting:',id);
        this.isConnecting = true;
        return new Promise( (resolve, reject) =>{
            this.manager.connectToDevice(id)
                .then(device=>{
                    console.log('connect success:',device.name,device.id);
                    this.peripheralId = device.id;
                    // resolve(device);
                    return device.discoverAllServicesAndCharacteristics();
                })
                .then(device=>{
                    return this.fetchServicesAndCharacteristicsForDevice(device)
                })
                .then(services=>{
                    console.log('fetchServicesAndCharacteristicsForDevice',services);
                    this.isConnecting = false;
                    this.getUUID(services);
                    resolve();
                })
                .catch(err=>{
                    this.isConnecting = false;
                    console.log('connect fail: ',err);
                    reject(err);
                })
        });
    }


    disconnect(){
        return new Promise( (resolve, reject) =>{
            this.manager.cancelDeviceConnection(this.peripheralId)
                .then(res=>{
                    console.log('disconnect success',res);
                    resolve(res);
                })
                .catch(err=>{
                    reject(err);
                    console.log('disconnect fail',err);
                })
        });
    }


    read(index){
        return new Promise( (resolve, reject) =>{
            this.manager.readCharacteristicForDevice(this.peripheralId,this.readServiceUUID[index], this.readCharacteristicUUID[index])
                .then(characteristic=>{
                    let buffer = Buffer.from(characteristic.value,'base64');
                    let value = buffer.toString();
                    console.log('read success',value);
                    // console.log('read success',characteristic.value);
                    resolve(value);
                },error=>{
                    console.log('read fail: ',error);
                    this.alert('read fail: ' + error.reason);
                    reject(error);
                })
        });
    }



    write(value,index){
        let transactionId = 'write';
        return new Promise( (resolve, reject) =>{
            this.manager.writeCharacteristicWithResponseForDevice(this.peripheralId,this.writeWithResponseServiceUUID[index],
                this.writeWithResponseCharacteristicUUID[index],value,transactionId)
                .then(characteristic=>{
                    console.log('write success',value);
                    resolve(characteristic);
                },error=>{
                    console.log('write fail: ',error);
                    this.alert('write fail: ',error.reason);
                    reject(error);
                })
        });
    }


    writeWithoutResponse(value,index){
        let transactionId = 'writeWithoutResponse';
        return new Promise( (resolve, reject) =>{
            this.manager.writeCharacteristicWithoutResponseForDevice(this.peripheralId, this.writeWithoutResponseServiceUUID[index],
                this.writeWithoutResponseCharacteristicUUID[index],value,transactionId)
                .then(characteristic=>{
                    console.log('writeWithoutResponse success',value);
                    resolve(characteristic);
                },error=>{
                    console.log('writeWithoutResponse fail: ',error);
                    this.alert('writeWithoutResponse fail: ',error.reason);
                    reject(error);
                })
        });
    }


    destroy(){
        this.manager.destroy();
    }

    alert(text){
        Alert.alert('prompt',text,[{ text:'determine',onPress:()=>{ } }]);
    }
}
