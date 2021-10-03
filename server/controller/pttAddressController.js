const path = require('path')
const fs = require('fs') // core node
const rawData = fs.readFileSync(
  path.join(__dirname, '../utils/pttAddress_20210624.json'),
  'utf-8'
)
const ptt = JSON.parse(rawData)

//* @desc: Fetch province names from .csv file
//* @route: GET /api/users/pttAddresses/provinces
//* @access: Private
exports.getProvinces = async (req, res) => {
  try {
    const response = await [...new Set(ptt.map((el) => el.province))].sort(
      (a, b) => a.localeCompare(b)
    )

    res.status(200).json({
      success: true,
      result: response.length,
      provinces: response,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      ı,
    })
  }
}

//* @desc: Get districts by given province name
//* @route: GET /api/users/pttAddresses/:province
//* @access: Private
exports.getDistricts = async (req, res) => {
  try {
    const districts = await ptt
      .filter((el) => el.province === req.params.province)
      .map((val) => val.district)

    const response = [...new Set(districts)].sort((a, b) => a.localeCompare(b))

    res.status(200).json({
      success: true,
      result: response.length,
      districts: response,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//* @desc: Get neighbourhoods by given province and district name
//* @route: GET /api/users/pttAddresses/neighbourhood
//* @access: Private
exports.getNeighbourhoods = async (req, res) => {
  try {
    const data = await ptt
      .filter(
        (el) =>
          el.province === req.params.province &&
          el.district === req.params.district
      )
      .map((val) => val.neighbourhood)

    const response = [...new Set(data)].sort((a, b) => a.localeCompare(b))

    res.status(200).json({
      success: true,
      result: response.length,
      neighbourhoods: response,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
