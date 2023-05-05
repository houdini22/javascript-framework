<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    static public $STATUS_NOT_ACTIVE = 0;

    static public $STATUS_ACTIVE = 1;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'status', 'is_deletable', 'avatar'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_deletable' => 'boolean',
        'is_super_admin' => 'boolean'
    ];

    public function generateToken()
    {
        do {
            $this->token = Str::random(32);
            $passed = true;
            try {
                $this->save();
            } catch (\Exception $e) {
                $passed = false;
            }
        } while ($passed === false);
    }

    public static function getFromRequest(\Illuminate\Http\Request $request)
    {
        $token = $request->header('X-SESSION-TOKEN');

        if ($token) {
            $user = \App\Models\User::where('token', '=', $token)->first();
            if ($user) {
                $user->last_active = Carbon::now();
                $user->save();

                return $user;
            }
        }
        return false;
    }

    public function avatar() {
        return $this->hasOne(File::class, 'id', 'avatar_id');
    }

    public function files() {
        return $this->hasMany(File::class, 'user_id', 'id');
    }

    public function delete()
    {
        if ($this->avatar()) {
            $this->avatar()->delete();
        }

        return parent::delete(); // TODO: Change the autogenerated stub
    }

    public function toAuthArray() {
        $avatar = $this->avatar()->first();

        $additional = [];
        if ($this->is_super_admin) {
            $additional[] = 'Super Admin';
        }

        return [
            'user' => [
                'name' => $this->name,
                'email' => $this->email,
                'token' => $this->token,
                'roles' => array_unique(
                    array_merge(
                        $this->roles->pluck('name')->toArray(),
                        $additional
                    )
                ),
                'permissions' => array_unique(
                    array_merge(
                        $this->getPermissionsViaRoles()->pluck('name')->toArray(),
                        collect($this->permissions->toArray())->pluck('name')->toArray(),
                    )
                ),
                'avatar' => $avatar ? $avatar->toArray() : null,
            ]
        ];
    }
}
