<style>

    #navbar-header {
        background-color: #f8f1ef;
        position: fixed;
        margin:0;
        z-index: 1000;
        
    }

    a {
        font-family: 'Figtree', Helvetica, Arial, sans-serif;
        font-size: 16px;
        color: #856658;
        margin-right:15px;
        margin-bottom: 0;
        text-decoration: none;
    }

    a:hover {
        color: #F8AA9D;
        text-decoration: underline;
    }

</style>
<template>
    <div class="row">
        <div class="navbar-header" id="navbar-header">
            <div class="container-fluid">
                <nav class="navbar navbar-expand-sm ">
                    <img src="../img/logo2.png" style="width: 80px">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse justify-content-end text-center"
                        id="navbarSupportedContent">
                        <ul class="navbar-nav">

                            <li class="nav-item px-1">
                                <router-link to="/search">Search</router-link>
                            </li>

                            <li class="nav-item px-1">
                                <router-link to="/bookings">Bookings</router-link>
                            </li>

                            <li class="nav-item px-1">
                                <router-link to="/chat">Chats</router-link>
                            </li>

                            <li class="nav-item active px-1">
                                <router-link to="/profile">Profile</router-link>
                            </li>

                            <li class="nav-item active px-1">
                                <router-link to="/" style="color:rgb(195, 82, 82)" target="blank">Log Out</router-link>
                            </li>

                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>
<script>
   
</script>