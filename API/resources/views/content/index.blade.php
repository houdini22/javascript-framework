@extends('layouts.app', ['meta' => $meta, 'mainMenu' => $mainMenu])
@section('content')
    @include("content._jumbotron")
    <div class="row">
        <div class="col-md-{{count($menu) ? 8 : 12}}">
            <h3 class="pb-3 mb-4 font-italic border-bottom">
                {{$document->document_name}}
            </h3>
            <div>
                {{$document->document_content}}
            </div>
        </div>
        @if (count($menu))
            @include('content._menu', ['tree' => $tree, 'parent' => NULL, 'menu' => $menu, 'slug' => $slug])
        @endif
    </div>
@endsection()
