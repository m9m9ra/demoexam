import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  Dio _dio = Dio();
  List<dynamic> serverData = [];
  bool isPending = true;

  @override
  void initState() {
    super.initState();
    _dio.get('http://localhost:3000').then((Response<dynamic> data) {
      debugPrint(data.data.toString());
      setState(() {
        serverData = data.data;
        isPending = false;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CupertinoNavigationBar(
        leading: null,
        middle: Text('Application'),
      ),
      backgroundColor: Colors.white,
      body: Container(
        color: Colors.white,
        padding: EdgeInsets.symmetric(horizontal: 12.0, vertical: 24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (isPending)
              Expanded(child: Center(child: CupertinoActivityIndicator()))
            else
              ...serverData.map((dynamic data) {
                return Container(
                  height: 64.0,
                  width: double.maxFinite,
                  margin: EdgeInsets.only(bottom: 12.0),
                  color: Colors.amber,
                );
              }),
          ],
        ),
      ),
    );
  }
}
