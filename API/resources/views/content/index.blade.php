@extends('layouts.app', ['meta' => $meta])
@section('content')
    @include("content._jumbotron")
    <div class="row">
        <div class="col-md-8">
            <h3 class="pb-3 mb-4 font-italic border-bottom">
                {{$document->document_name}}
            </h3>
            <div>
                {{$document->document_content}}
            </div>
        </div>
    </div>
@endsection()
