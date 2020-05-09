// // @flow
// import {
//   VirtualizedList,
//   View,
//   TouchableOpacity,
//   Image,
//   Text,
// } from 'react-native';
// import _ from 'lodash';
// import moment from 'moment';
// import React from 'react';

// import styleConstructor from './style';

// import DayView from './DayView';

// export default class EventCalendar extends React.Component {
//   constructor(props) {
//     super(props);

//     const start = props.start ? props.start : 0;
//     const end = props.end ? props.end : 24;

//     this.styles = styleConstructor(props.styles, (end - start) * 100);
//     this.state = {
//       date: moment(this.props.initDate),
//       index: this.props.size,
//     };
//   }

//   componentDidMount() {
//     if (this.props.onRef) {
//       this.props.onRef(this);
//     }
//   }

//   componentWillUnmount() {
//     if (this.props.onRef) {
//       this.props.onRef(undefined);
//     }
//   }

//   static defaultProps = {
//     size: 30,
//     initDate: new Date(),
//     formatHeader: 'DD MMMM YYYY',
//   };

//   _getItemLayout(data, index) {
//     const { width } = this.props;
//     return { length: width, offset: width * index, index };
//   }

//   _getItem(events, index) {
//     const date = moment(this.props.initDate).add(
//       index - this.props.size,
//       'days'
//     );
//     return _.filter(events, event => {
//       const eventStartTime = moment(event.start);
//       return (
//         eventStartTime >= date.clone().startOf('day') &&
//         eventStartTime <= date.clone().endOf('day')
//       );
//     });
//   }

//   _renderItem({ index, item }) {
//     const {
//       width,
//       format24h,
//       initDate,
//       scrollToFirst = true,
//       start = 0,
//       end = 24,
//       formatHeader,
//       upperCaseHeader = false,
//     } = this.props;
//     const date = moment(initDate).add(index - this.props.size, 'days');

//     const leftIcon = this.props.headerIconLeft ? (
//         this.props.headerIconLeft
//     ) : (
//         <Image source={require('./back.png')} style={this.styles.arrow} />
//     );
//     const rightIcon = this.props.headerIconRight ? (
//         this.props.headerIconRight
//     ) : (
//         <Image source={require('./forward.png')} style={this.styles.arrow} />
//     );

//     let headerText = upperCaseHeader
//         ? date.format(formatHeader || 'DD MMMM YYYY').toUpperCase()
//         : date.format(formatHeader || 'DD MMMM YYYY');

//     return (
//       <View style={[this.styles.container, { width }]}>
//         <View style={this.styles.header}>
//           <TouchableOpacity
//               style={this.styles.arrowButton}
//               onPress={this._previous}
//           >
//             {leftIcon}
//           </TouchableOpacity>
//           <View style={this.styles.headerTextContainer}>
//             <Text style={this.styles.headerText}>{headerText}</Text>
//           </View>
//           <TouchableOpacity
//               style={this.styles.arrowButton}
//               onPress={this._next}
//           >
//             {rightIcon}
//           </TouchableOpacity>
//         </View>
//         <DayView
//           date={date}
//           index={index}
//           format24h={format24h}
//           formatHeader={this.props.formatHeader}
//           headerStyle={this.props.headerStyle}
//           renderEvent={this.props.renderEvent}
//           eventTapped={this.props.eventTapped}
//           events={item}
//           width={width}
//           styles={this.styles}
//           scrollToFirst={scrollToFirst}
//           start={start}
//           end={end}
//         />
//       </View>
//     );
//   }

//   _goToPage(index) {
//     if (index <= 0 || index >= this.props.size * 2) {
//       return;
//     }
//     const date = moment(this.props.initDate).add(
//       index - this.props.size,
//       'days'
//     );
//     this.refs.calendar.scrollToIndex({ index, animated: false });
//     this.setState({ index, date });
//   }

//   _goToDate(date) {
//     const earliestDate = moment(this.props.initDate).subtract(
//       this.props.size,
//       'days'
//     );
//     const index = moment(date).diff(earliestDate, 'days');
//     this._goToPage(index);
//   }

//   _previous = () => {
//     this._goToPage(this.state.index - 1);
//     if (this.props.dateChanged) {
//       this.props.dateChanged(
//         moment(this.props.initDate)
//           .add(this.state.index - 1 - this.props.size, 'days')
//           .format('YYYY-MM-DD')
//       );
//     }
//   };

//   _next = () => {
//     this._goToPage(this.state.index + 1);
//     if (this.props.dateChanged) {
//       this.props.dateChanged(
//         moment(this.props.initDate)
//           .add(this.state.index + 1 - this.props.size, 'days')
//           .format('YYYY-MM-DD')
//       );
//     }
//   };

//   render() {
//     const {
//       width,
//       virtualizedListProps,
//       events,
//       initDate,
//     } = this.props;

//     return (
//       <View style={[this.styles.container, { width }]}>
//         <VirtualizedList
//           ref="calendar"
//           windowSize={2}
//           initialNumToRender={2}
//           initialScrollIndex={this.props.size}
//           data={events}
//           getItemCount={() => this.props.size * 2}
//           getItem={this._getItem.bind(this)}
//           keyExtractor={(item, index) => index.toString()}
//           getItemLayout={this._getItemLayout.bind(this)}
//           horizontal
//           pagingEnabled
//           renderItem={this._renderItem.bind(this)}
//           style={{ width: width }}
//           onMomentumScrollEnd={event => {
//             const index = parseInt(event.nativeEvent.contentOffset.x / width);
//             const date = moment(this.props.initDate).add(
//               index - this.props.size,
//               'days'
//             );
//             if (this.props.dateChanged) {
//               this.props.dateChanged(date.format('YYYY-MM-DD'));
//             }
//             this.setState({ index, date });
//           }}
//           {...virtualizedListProps}
//         />
//       </View>
//     );
//   }
// }
//
// @flow
import {
  VirtualizedList,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import _ from "lodash";
import moment from "moment";
import React, { PureComponent } from "react";

import styleConstructor from "./style";

import DayView from "./DayView";

// export class SingleDay extends React.PureComponent {
//   constructor(props) {
//     super(props);

//     const start = props.start ? props.start : 0;
//     const end = props.end ? props.end : 24;

//     this.styles = styleConstructor(props.styles, (end - start) * 100);
//     this.state = {
//       date: moment(this.props.initDate),
//       index: this.props.size
//     };
//   }
//   render() {
//     // const {height, width} = Dimensions.get('window')
//     const {
//       index,
//       item,
//       width,
//       format24h,
//       initDate,
//       scrollToFirst = true,
//       shouldScrollToCurrTime,
//       start = 0,
//       end = 24,
//       formatHeader,
//       headerButtonPress,
//       upperCaseHeader = false
//     } = this.props;
//     const date = moment(initDate).add(index - this.props.size, "days");

//     dateIsToday = date1 => {
//       return moment(date1).format("MMMM, DD") === moment().format("MMMM, DD");
//     };
//     return (
//       <View style={[this.styles.container, { width }]}>
//         <View style={styles.titleContainer}>
//           <View>
//             {/* <Text style={styles.titleText}>{selectedDate.toString()}</Text> */}
//             <Text style={[styles.titleText, { paddingTop: 7 }]}>
//               {dateIsToday(date) ? <Text> Today</Text> : ""}
//             </Text>
//             <Text style={styles.dateText}>
//               <Text> {moment(date).format("MMMM D")} </Text>
//             </Text>
//           </View>

//           <View>
//             <TouchableOpacity
//               style={styles.seemoreButton}
//               onPress={headerButtonPress}
//             >
//               <FontAwesome5 name="ellipsis-h" />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <DayView
//           date={date}
//           index={index}
//           format24h={format24h}
//           formatHeader={this.props.formatHeader}
//           headerStyle={this.props.headerStyle}
//           renderEvent={this.props.renderEvent}
//           eventTapped={this.props.eventTapped}
//           events={item}
//           width={width}
//           styles={this.styles}
//           scrollToFirst={scrollToFirst}
//           start={start}
//           end={end}
//           shouldScrollToCurrTime={true}
//         />
//       </View>
//     );
//   }
// }

export default class EventCalendar extends React.Component {
  constructor(props) {
    super(props);

    const start = props.start ? props.start : 0;
    const end = props.end ? props.end : 24;

    this.styles = styleConstructor(props.styles, (end - start) * 100);
    this.state = {
      date: moment(this.props.initDate),
      index: this.props.size
    };
  }

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  componentWillUnmount() {
    if (this.props.onRef) {
      this.props.onRef(undefined);
    }
  }

  static defaultProps = {
    size: 30,
    initDate: new Date(),
    formatHeader: "DD MMMM YYYY"
  };

  _getItemLayout(data, index) {
    const { width } = this.props;
    return { length: width, offset: width * index, index };
  }

  _getItem(events, index) {
    const date = moment(this.props.initDate).add(
      index - this.props.size,
      "days"
    );
    return _.filter(events, event => {
      const eventStartTime = moment(event.start);
      return (
        eventStartTime >= date.clone().startOf("day") &&
        eventStartTime <= date.clone().endOf("day")
      );
    });
  }

  _renderItem({ index, item }) {
    const {
      width,
      format24h,
      initDate,
      scrollToFirst = true,
      shouldScrollToCurrTime,
      start = 0,
      end = 24,
      formatHeader,
      headerButtonPress,
      upperCaseHeader = false
    } = this.props;
    const date = moment(initDate).add(index - this.props.size, "days");

    dateIsToday = date1 => {
      return moment(date1).format("MMMM, DD") === moment().format("MMMM, DD");
    };

    const leftIcon = this.props.headerIconLeft ? (
      this.props.headerIconLeft
    ) : (
      <Image source={require("./back.png")} style={this.styles.arrow} />
    );
    const rightIcon = this.props.headerIconRight ? (
      this.props.headerIconRight
    ) : (
      <Image source={require("./forward.png")} style={this.styles.arrow} />
    );

    let headerText = upperCaseHeader
      ? date.format(formatHeader || "DD MMMM YYYY").toUpperCase()
      : date.format(formatHeader || "DD MMMM YYYY");

    return (
      <View style={[this.styles.container, { width }]}>
        {/* <View style={this.styles.header}>
          <TouchableOpacity
              style={this.styles.arrowButton}
              onPress={this._previous}
          >
            {leftIcon}
          </TouchableOpacity>
          <View style={this.styles.headerTextContainer}>
            <Text style={this.styles.headerText}>{headerText}</Text>
          </View>
          <TouchableOpacity
              style={this.styles.arrowButton}
              onPress={this._next}
          >
            {rightIcon}
          </TouchableOpacity>
        </View> */}
        <View style={styles.titleContainer}>
          <View>
            {/* <Text style={styles.titleText}>{selectedDate.toString()}</Text> */}
            <Text style={[styles.titleText, { paddingTop: 7 }]}>
              {dateIsToday(date) ? <Text> Today</Text> : ""}
            </Text>
            <Text style={styles.dateText}>
              <Text> {moment(date).format("dddd, MMMM D")} </Text>
            </Text>
          </View>

          <View>
            <TouchableOpacity
              style={styles.seemoreButton}
              onPress={headerButtonPress}
            >
              <FontAwesome5 name="ellipsis-h" />
            </TouchableOpacity>
          </View>
        </View>
        <DayView
          date={date}
          index={index}
          format24h={format24h}
          formatHeader={this.props.formatHeader}
          headerStyle={this.props.headerStyle}
          renderEvent={this.props.renderEvent}
          eventTapped={this.props.eventTapped}
          events={item}
          width={width}
          styles={this.styles}
          scrollToFirst={false}
          start={start}
          end={end}
          shouldScrollToCurrTime={shouldScrollToCurrTime}
        />
      </View>
    );
  }

  _goToPage(index) {
    if (index <= 0 || index >= this.props.size * 2) {
      return;
    }
    const date = moment(this.props.initDate).add(
      index - this.props.size,
      "days"
    );
    this.refs.calendar.scrollToIndex({ index, animated: false });
    this.setState({ index, date });
  }

  _goToDate(date) {
    const earliestDate = moment(this.props.initDate).subtract(
      this.props.size,
      "days"
    );
    const index = moment(date).diff(earliestDate, "days");
    this._goToPage(index);
  }

  _previous = () => {
    this._goToPage(this.state.index - 1);
    if (this.props.dateChanged) {
      this.props.dateChanged(
        moment(this.props.initDate)
          .add(this.state.index - 1 - this.props.size, "days")
          .format("YYYY-MM-DD")
      );
    }
  };

  _next = () => {
    this._goToPage(this.state.index + 1);
    if (this.props.dateChanged) {
      this.props.dateChanged(
        moment(this.props.initDate)
          .add(this.state.index + 1 - this.props.size, "days")
          .format("YYYY-MM-DD")
      );
    }
  };

  render() {
    const { width, virtualizedListProps, events, initDate } = this.props;

    return (
      <View style={[this.styles.container, { width }]}>
        <VirtualizedList
          ref="calendar"
          windowSize={2}
          initialNumToRender={2}
          initialScrollIndex={this.props.size}
          data={events}
          getItemCount={() => this.props.size * 2}
          getItem={this._getItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          getItemLayout={this._getItemLayout.bind(this)}
          horizontal
          pagingEnabled
          headerButtonPress={this.props.headerButtonPress}
          renderItem={this._renderItem.bind(this)}
          // renderItem={({ index, item }) => (
          //   <SingleDay {...this.props} index={index} item={item} />
          // )}
          style={{ width: width }}
          onMomentumScrollEnd={event => {
            const index = parseInt(event.nativeEvent.contentOffset.x / width);
            const date = moment(this.props.initDate).add(
              index - this.props.size,
              "days"
            );
            if (this.props.dateChanged) {
              this.props.dateChanged(date.format("YYYY-MM-DD"));
            }
            this.setState({ index, date });
          }}
          {...virtualizedListProps}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#f7f7f7"
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 20,
    // paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  titleText: {
    fontFamily: "SFProDisplay-Heavy",
    fontSize: 24,
    color: "#222222",
    paddingBottom: 10
  },
  dateText: {
    // marginTop: 31,
    // marginBottom: 11,
    fontFamily: "SFProDisplay-Regular",
    fontSize: 18,
    color: "#222222"
  },
  seemoreButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#fff"
  }
});
