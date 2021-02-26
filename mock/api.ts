import heroList from './heros.json';
import item from './item.json';
import summoner from './summoner.json';

export default {
    '/api/web201605/js/herolist':heroList,
    '/api/web201605/js/herodetail':(req, res) => {
        let { ename } = req.query;
        if(!ename) ename = 106;
        const hero = heroList.filter(item => item.ename === parseInt(ename, 10))[0];
        res.send(hero);
       
    },
    'POST /api/web201605/js/freeheros':(req, res) => {
        const { number } = req.body;
        function getRandomArrayElements(arr, count) {
            let shuffled = arr.slice(0),
            i = arr.length,
            min = i - count,
            temp,
            index;

            while(i-- > min){
                index = Math.floor((i + 1) * Math.random());
                temp = shuffled[index];
                shuffled[index] = shuffled[i];
                shuffled[i] = temp;
            }
            return shuffled.slice(min);
        };

        const freeheros = getRandomArrayElements(heroList, number);
        res.send(freeheros);
    },
    '/api/web201605/js/item':item,
    '/api/web201605/js/summoner':summoner,
}