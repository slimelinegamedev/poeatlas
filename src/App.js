import React, { Component } from 'react'
import { Table, Menu, Input, Checkbox, Button } from 'semantic-ui-react'
import fp from 'lodash/fp'
import './App.css'

import atlas from './maps.json'

const WHITE = "#999" // TODO: change color
const RED = "#C22626"
const RARE = "#A3A314"
const UNIQUE = "#AF6025"

const Map = ({ name }) => {
    const { tier, isUniqueMap } = atlas[name]

    let color
    if (tier >= 10) { color = RED }
    else if (tier < 10 && tier >= 6) { color = RARE }
    else { color = WHITE }

    if (isUniqueMap) { color = UNIQUE }

    return <span style={{ color }}>{name}</span>
}

const MapList = ({ maps }) => (
    <div>
        {fp.map(m => <p key={m}><Map name={m} /></p>)(maps)}
    </div>
)

const Cell = (props) => (
    <Table.Cell {...props} style={{ color: WHITE, borderColor: 'rgb(68, 68, 68)' }} />
)

class MapTable extends Component {
    renderHeader() {
        const headerStyles = { backgroundColor: '#333', color: WHITE }

        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell style={headerStyles} />
                    <Table.HeaderCell style={headerStyles}>Name</Table.HeaderCell>
                    <Table.HeaderCell style={headerStyles}>Tier</Table.HeaderCell>
                    <Table.HeaderCell style={headerStyles}>From</Table.HeaderCell>
                    <Table.HeaderCell style={headerStyles}>To</Table.HeaderCell>
                    <Table.HeaderCell style={headerStyles}>Links</Table.HeaderCell>
                    <Table.HeaderCell style={headerStyles}>Sextants</Table.HeaderCell>

                    {/* <Table.HeaderCell>Data</Table.HeaderCell> */}
                </Table.Row>
            </Table.Header>
        )
    }

    renderRow(mapData) {
        const {
            name,
            tier,
            icon,
            upgradeTo,
            upgradeFrom,
            linkedTo,
            sextants,
        } = mapData

        return (
            <Table.Row key={name} verticalAlign="top">
                <Cell verticalAlign="middle">
                    <Checkbox />
                </Cell>
                <Cell>
                    <p style={{ display: 'flex', alignItems: 'center' }}>
                        <img alt={name} src={icon} style={{ paddingRight: "1em" }}/>
                        <Map name={name}></Map>
                    </p>
                </Cell>
                <Cell style={{ color: '' }}>{tier}</Cell>
                <Cell style={{ color: '' }}>{upgradeFrom}</Cell>
                <Cell>{upgradeTo}</Cell>
                <Cell>{<MapList maps={linkedTo} />}</Cell>
                <Cell>{<MapList maps={sextants} />}</Cell>

                {/* <Cell>{JSON.stringify(mapData)}</Cell> */}
            </Table.Row>
        )
    }

    render() {
        return (
            <div>
                <Table celled striped compact size="small" style={{ backgroundColor: 'black' }}>
                    {this.renderHeader()}
                    <Table.Body>
                        {Object.values(atlas).map(this.renderRow)}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <Menu attached="top" style={{ backgroundColor: '#333' }}>
                    <Menu.Menu>
                        <div className="ui aligned search item">
                            <Input icon="search" placeholder="Search" />
                        </div>
                    </Menu.Menu>
                    <Menu.Menu position="right">
                        <div className="ui item">
                            <Button primary>Shaping</Button>
                        </div>
                        <div className="ui item">
                            <Checkbox toggle label="Complete" />
                        </div>
                        <div className="ui item">
                            <Checkbox toggle label="Unique" />
                        </div>
                    </Menu.Menu>
                </Menu>
                <MapTable />
            </div>
        )
    }
}

export default App