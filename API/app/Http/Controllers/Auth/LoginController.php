<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Config;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function getIndex(Request $request) {
        $meta = [];
        $meta['title'] = Config::getByKey('cms.meta.title')->value;
        $meta['description'] = Config::getByKey('cms.meta.description')->value;
        $meta['keywords'] = Config::getByKey('cms.meta.keywords')->value;
        $meta['robots'] = Config::getByKey('cms.meta.robots')->value;

        return response(view('auth.login', ['meta' => $meta]));
    }

    public function postLogin(Request $request) {
        $meta = [];
        $meta['title'] = Config::getByKey('cms.meta.title')->value;
        $meta['description'] = Config::getByKey('cms.meta.description')->value;
        $meta['keywords'] = Config::getByKey('cms.meta.keywords')->value;
        $meta['robots'] = Config::getByKey('cms.meta.robots')->value;

        $error = [
            'message' => "WRONG_EMAIL_OR_PASSWORD"
        ];

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            if ($user->status === User::$STATUS_ACTIVE) {
                $error = NULL;
                $user->last_active = Carbon::now();
                $user->save();

                return redirect('/');
            } else {
                $error = [
                    'message' => "ACCOUNT_NOT_ACTIVE",
                ];
            }
        }

        return response(view('auth.login', ['meta' => $meta, 'error' => $error]));
    }

    public function logout(Request $request)
    {
        Session::flush();
        Auth::logout();

        return redirect('/');
    }
}
