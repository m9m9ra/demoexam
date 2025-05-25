import 'package:application/home_screen.dart';
import 'package:go_router/go_router.dart';

class RouterConfigGo {
  static GoRouter get router => GoRouter(
    routes: [
      GoRoute(path: '/', name: '/', builder: (context, state) => HomeScreen()),
    ],
  );
}
