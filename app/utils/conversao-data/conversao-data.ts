
export function converterData(data: Date){
    const data_gerada = new Date(data);
    const data_completa = new Date(data_gerada.valueOf() - data_gerada.getTimezoneOffset() * 60000);
    return data_completa;
}