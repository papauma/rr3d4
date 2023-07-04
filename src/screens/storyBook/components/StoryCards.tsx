import RouteCard from '@src/components/features/planner/result/molecules/RouteCard'
import { ILeg } from '@src/types/PlannerInterfaces'
import React from 'react'
import { View } from 'react-native'

export default function StoryCards() {

  const legsExample1 : Array<ILeg> = [
    {
        id: 123,
        mode: 'WALK',
        routeShortName: 'Andar',
        duration: 5,
    },
    {
        id: 124,
        mode: 'BUS',
        routeShortName: '25',
        duration: 10,
        agencyId: '10:6',
        headsign: 'Palma',
        routeColor: '7A77C7',
    },
    {
        id: 125,
        mode: 'WALK',
        routeShortName: 'Andar',
        duration: 14,
    },
    {
        id: 135,
        mode: 'BUS',
        routeShortName: '2',
        duration: 20,
        agencyId: '10:6',
        headsign: 'Palma',
        routeColor: '7A77C7',
    },
    /* {
        id: 137,
        mode: 'WALK',
        routeShortName: 'Andar',
        duration: 4,
    } */
  ]

  const legsExample2 : Array<ILeg> = [
    {
        id: 143,
        mode: 'WALK',
        routeShortName: 'Andar',
        duration: 5,
    },
    {
        id: 144,
        mode: 'BUS',
        routeShortName: '8',
        duration: 10,
        agencyId: '10:6',
        headsign: 'Palma',
        routeColor: '993636',

    },
  ]

  const legsExample3 : Array<ILeg> = [
    {
        id: 153,
        mode: 'WALK',
        routeShortName: 'Andar',
        duration: 5,
    },
    {
        id: 154,
        mode: 'BUS',
        routeShortName: '12',
        duration: 10,
        agencyId: '10:6',
        headsign: 'Palma',
        routeColor: 'D8C05B',

    },
    {
        id: 155,
        mode: 'WALK',
        routeShortName: 'Andar',
        duration: 14,
    },
  ]

  const legsExample4 : Array<ILeg> = [
    {
        id: 163,
        mode: 'WALK',
        routeShortName: 'Andar',
        duration: 5,
    },
    {
        id: 164,
        mode: 'BUS',
        routeShortName: '21',
        duration: 10,
        agencyId: '10:6',
        headsign: 'Palma',
        routeColor: 'F6AA00',

    },
    {
        id: 165,
        mode: 'WALK',
        routeShortName: 'Andar',
        duration: 14,
    },
    {
        id: 166,
        mode: 'BUS',
        routeShortName: '12',
        duration: 18,
        agencyId: '10:6',
        headsign: 'Palma',
        routeColor: 'D8C05B',
    },
    {
        id: 167,
        mode: 'WALK',
        routeShortName: 'Andar',
        duration: 4,
    }
  ]

  const legsExample5 : Array<ILeg> = [
    {
        id: 173,
        mode: 'WALK',
        routeShortName: 'Andar',
        duration: 20,
    },
  ]

  const legsExample6 : Array<ILeg> = [
    {
        id: 183,
        mode: 'WALK',
        routeShortName: 'Andar',
        duration: 5,
    },
    {
        id: 184,
        mode: 'BUS',
        routeShortName: '11',
        duration: 10,
        agencyId: '10:6',
        headsign: 'Palma',
        routeColor: 'F6AA00',
        transhipment: true,
    },
    {
        id: 186,
        mode: 'BUS',
        routeShortName: '6',
        duration: 30,
        agencyId: '10:6',
        headsign: 'Palma',
        routeColor: '993636',
    },
    {
        id: 187,
        mode: 'WALK',
        routeShortName: 'Andar',
        duration: 4,
    }
  ]

  return (
    <View style={{flex: 1}}>
        {/* <RouteCard first={true}
            route={{
                duration: 19,
                startTime: '9:31',
                endTime: '9:50',
                alert: false,
                legs: legsExample1,
            }}
            index={1}
        />
        <RouteCard style={{marginTop: 16}}
            route={{
                duration: 87,
                startTime: '9:31',
                endTime: '10:58',
                alert: true,
                legs: legsExample2,
            }}
            index={1}
        />
        <RouteCard style={{marginTop: 16}}
            route={{
                duration: 87,
                startTime: '9:31',
                endTime: '10:03',
                legs: legsExample3,
            }}
            index={1}
        />
         <RouteCard style={{marginTop: 16}}
            route={{
                duration: 87,
                startTime: '10:31',
                endTime: '11:58',
                legs: legsExample4,
            }}
            index={1}
        />
        <RouteCard style={{marginTop: 16}}
            route={{
                duration: 20,
                startTime: '10:31',
                endTime: '10:51',
                legs: legsExample5,
            }}
            index={1}
        />
        <RouteCard style={{marginTop: 16}}
            route={{
                duration: 90,
                startTime: '10:31',
                endTime: '12:01',
                legs: legsExample6,
            }}
            index={1}
        />
         <RouteCard style={{marginTop: 16}}
            route={{
                duration: 87,
                startTime: '9:31',
                endTime: '10:58',
                legs: [],
            }}
            index={1}
        /> */}
    </View>
  )
}
