const houses = require('./db.json')

module.exports = {
	getHouses: (req, res) => {
		res.status(200).send(houses)
	},
	createHouse: (req, res) => {
		const {address, price, imageURL} = req.body
		let newId = Math.max(...houses.map((elem) => elem.id)) + 1

		let newHouse = {
			id: newId,
			address,
			price,
			imageURL
		}

		houses.push(newHouse)
		res.status(200).send(houses)
	},
	updateHouse: (req, res) => {
		let Idx = houses.findIndex((elem) => elem.id === +req.params.id)
		
		action = req.body.type
		if (action === 'minus') {
			if (houses[Idx].price === 0) {
				res.status(400).send('Cannot go below 0')
			} else if (houses[Idx].price < 10000) {
				houses[Idx].price = 0
				res.status(200).send(houses)
			} else {
				houses[Idx].price -= 10000
				res.status(200).send(houses)
			}
		} else if (action === 'plus') {
			houses[Idx].price += 10000
			res.status(200).send(houses)
		}

	},
	deleteHouse: (req, res) => {
		houses.splice(houses.findIndex((elem) => elem.id === +req.params.id), 1)
		res.status(200).send(houses)
	}
}