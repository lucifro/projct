function getweather(citycode) {
    myAxios({
        url: 'http://hmajax.itheima.net/api/weather',
        params: {
            city: citycode
        }
    }).then(result => {
        console.log(result);
        // 渲染页面
        // 时间日期
        const wobj = result.data
        const datastr = `
            <span class="dateShort">${wobj.date}</span>
            <span class="calendar">农历&nbsp;
            <span class="dateLunar">${wobj.dateLunar}</span>
        </span>
        `
        document.querySelector('.title').innerHTML = datastr
        // 城市名字
        document.querySelector('.area').innerHTML = wobj.area
        // 当天气温
        const nowhot = `
        <div class="tem-box">
        <span class="temp">
          <span class="temperature">${wobj.temperature}</span>
          <span>°</span>
        </span>
      </div>
      <div class="climate-box">
        <div class="air">
          <span class="psPm25">${wobj.psPm25}</span>
          <span class="psPm25Level">${wobj.psPm25Level}</span>
        </div>
        <ul class="weather-list">
          <li>
            <img src="${wobj.weatherImg}" class="weatherImg" alt="">
            <span class="weather">${wobj.weather}</span>
          </li>
          <li class="windDirection">${wobj.windDirection}</li>
          <li class="windPower">${wobj.windPower}</li>
        </ul>
      </div>
        `
        document.querySelector('.weather-box').innerHTML = nowhot
        const todayweather = wobj.todayWeather
        const nowweather = `
        <div class="range-box">
        <span>今天：</span>
        <span class="range">
          <span class="weather">${todayweather.weather}</span>
          <span class="temNight">${todayweather.temNight}</span>
          <span>-</span>
          <span class="temDay">${todayweather.temDay}</span>
          <span>℃</span>
        </span>
      </div>
      <ul class="sun-list">
        <li>
          <span>紫外线</span>
          <span class="ultraviolet">${todayweather.ultraviolet}</span>
        </li>
        <li>
          <span>湿度</span>
          <span class="humidity">${todayweather.humidity}</span>%
        </li>
        <li>
          <span>日出</span>
          <span class="sunriseTime">${todayweather.sunriseTime}</span>
        </li>
        <li>
          <span>日落</span>
          <span class="sunsetTime">${todayweather.sunsetTime}</span>
        </li>
      </ul>
        `
        document.querySelector('.today-weather').innerHTML = nowweather
        // 七天天气预报
        const dayForecast = wobj.dayForecast
        const dateFormatsstr = dayForecast.map(item => {
            return `
            <li class="item">
                <div class="date-box">
                <span class="dateFormat">${item.dateFormat}</span>
                <span class="date">${item.date}</span>
                </div>
                <img src="${item.weatherImg}" alt="" class="weatherImg">
                <span class="weather">${item.weather}</span>
                <div class="temp">
                <span class="temNight">${item.temNight}</span>-
                <span class="temDay">${item.temDay}</span>
                <span>℃</span>
                </div>
                <div class="wind">
                <span class="windDirection">${item.windDirection}</span>
                <span class="windPower">&lt;${item.windPower}</span>
                </div>
            </li>
            `
        }).join('')
        document.querySelector('.week-wrap').innerHTML = dateFormatsstr
    })
}
// 默认进入网页-就要获取天气数据（北京市城市编码：'110100'）
getweather('110100')
// 搜索框
document.querySelector('.search-city').addEventListener('input', (e) => {
    // 获取城市数据列表
    myAxios({
        url: 'http://hmajax.itheima.net/api/weather/city',
        params: {
            city: e.target.value
        }
    }).then(result => {
        const liststr = result.data.map(item => {
            return `
            <li class="city-item" data-code="${item.code}">${item.name}</li>
            `
        }).join('')
        document.querySelector('.search-list').innerHTML = liststr
    })
})
// 搜索渲染
document.querySelector('.search-list').addEventListener('click', e => {
    // 判断点击城市的li
    if (e.target.classList.contains('city-item')) {
        const cityCode = e.target.dataset.code
        getweather(cityCode)
    }
})